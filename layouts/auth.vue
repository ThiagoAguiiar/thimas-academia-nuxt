<template>
  <div class="w-full h-screen flex">
    <div class="flex-1">
      <header
        class="h-[70px] border-b border-b-gray-200 w-full flex items-center"
      >
        <nav class="w-[90%] mx-auto">
          <Logo />
        </nav>
      </header>
    </div>

    <div
      class="w-[600px] h-full flex items-center border-l border-l-gray-200 justify-center"
    >
      <ClientOnly>
        <div class="w-[400px]">
          <slot></slot>
        </div>

        <template #fallback>
          <div class="flex justify-center">
            <FallbackLoading />
          </div>
        </template>
      </ClientOnly>
    </div>
  </div>
</template>