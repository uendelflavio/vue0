---
title: Navigation Menu
description: A collection of links for navigating websites.
source: apps/www/src/registry/default/ui/navigation-menu
primitive: https://www.reka-ui.com/docs/components/navigation-menu.html
---

<ComponentPreview name="NavigationMenuDemo" />

## Installation

```bash
npx shadcn-vue@latest add navigation-menu
```

## Usage

```vue
<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
```

## Examples

### Link Component

When using the Nuxt `<NuxtLink />` component, you can use `navigationMenuTriggerStyle()` to apply the correct styles to the trigger.

```ts
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
```

```vue
<template>
  <NavigationMenuItem>
    <NuxtLink v-slot="{ isActive, href, navigate }" to="/docs" custom>
      <NavigationMenuLink :active="isActive" :href :class="navigationMenuTriggerStyle()" @click="navigate">
        Documentation
      </NavigationMenuLink>
    </NuxtLink>
  </NavigationMenuItem>
</template>
```
