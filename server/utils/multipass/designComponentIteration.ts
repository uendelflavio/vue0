import type { EventHandlerRequest, H3Event } from 'h3'
import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'
import type { OpenAI } from 'openai'

export default async (event: H3Event<EventHandlerRequest>, component: DBComponent) => {
  console.log('> init : design component iteration')
  const { prompt } = await readBody(event)

  const components = (await import('@/template/shadcn-vue/metadata.json')).default
  const functionSchema = z.object({
    new_component_description: z.string().describe(`Write a description for Vue component design task based on the user query. Stick strictly to what the user wants in their request - do not go off track`),
    use_library_components: z.array(z.object({
      library_component_name: z.enum(components.map(i => i.name) as [string]),
      library_component_usage_reason: z.string(),
    })),
  })

  const context: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: `system`,
      content:
        `Your task is to modify a Vue v3 component for a web app, according to the user's request.\n`
        + `If you judge it is relevant to do so, you can specify pre-made library single-file components to use in the single-file component update.\n`
        + `You can also specify the use of icons if you see that the user's update request requires it.`,
    },
    {
      role: `user`,
      content:
        `Multiple library components can be used while creating a new single-file component update in order to help you do a better design job, faster.\n\nAVAILABLE LIBRARY COMPONENTS:\n\`\`\`\n${
          components
            .map((e) => {
              return `${e.name} : ${e.description};`
            })
            .join('\n')
        }\n\`\`\``,
    },
    {
      role: `user`,
      content:
        `- Component description : \`${component.description}\`\n`
        + `- New component updates query : \n\`\`\`\n${prompt}\n\`\`\`\n\n`
        + `Design the Vue v3 single-file component updates for the user, as the creative genius you are`,
    },
  ]

  const stream = useOpenAI(event).beta.chat.completions.stream({
    model: 'gpt-4.1-nano', // 'gpt-3.5-turbo-1106',
    messages: context,
    tools: [
      {
        type: 'function',
        function: {
          name: `design_new_component_api`,
          description: `generate the required design details to create a new single-file component`,
          parameters: zodToJsonSchema(functionSchema),
        },
      },
    ],
    stream: true,
  })

  let completion = ''
  stream.on('chunk', (part) => {
    const chunk = part.choices[0]?.delta?.tool_calls?.[0]?.function?.arguments || ''
    completion += chunk
    event.node.res.write(chunk)
  })
  await stream.done()

  try {
    const parsed = JSON.parse(completion) as z.infer<typeof functionSchema>

    if (parsed) {
      event.node.req.componentDesignTask = {
        description: {
          user: prompt,
          llm: parsed.new_component_description,
        },
        components: parsed.use_library_components?.map(i => ({ name: i.library_component_name, usage: i.library_component_usage_reason })),
      }
    }
  }
  catch (err) {
    throw createError({
      statusCode: 400,
      statusMessage: 'OpenAI doesnt return expected data',
    })
  }
}
