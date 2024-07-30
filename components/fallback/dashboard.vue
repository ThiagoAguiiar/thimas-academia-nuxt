<template>
  <div class="flex w-full h-screen dark:bg-[#111827]">
    <aside
      class="min-w-[280px] w-[280px] bg-[#fafafa] border-r border-r-gray-200 dark:border-r-gray-800 dark:bg-[#111827] h-full max-[1184px]:hidden"
    >
      <div class="w-full h-full grid grid-rows-12 p-5">
        <div class="row-span-2 flex items-center">
          <div class="w-full space-y-4">
            <USkeleton class="bg-gray-200 h-5 w-full" />
            <USkeleton class="bg-gray-200 h-8 w-full" />
          </div>
        </div>

        <div class="row-span-8 space-y-2">
          <div
            class="flex w-full gap-x-3 items-center justify-between"
            v-for="x in 5"
          >
            <div class="flex flex-1 items-center gap-x-3">
              <USkeleton class="bg-gray-200 h-[30px] w-[30px]" />
              <USkeleton class="bg-gray-200 flex-1 h-[20px]" />
            </div>

            <USkeleton class="bg-gray-200 h-[20px] w-[20px]" />
          </div>
        </div>

        <div class="row-span-2 flex items-end justify-center">
          <div class="flex items-center w-full gap-x-3">
            <USkeleton class="h-[40px] w-[40px] rounded-full bg-gray-200" />
            <div class="flex-1 space-y-2">
              <USkeleton class="h-[20px] w-full bg-gray-200" />
              <USkeleton class="h-[10px] w-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex-grow">
      <div
        class="h-[60px] border-b border-b-gray-200 dark:border-b-gray-800 flex items-center px-5 gap-x-3"
      >
        <USkeleton class="h-[25px] w-[25px] bg-gray-200" />
        <USkeleton class="h-[25px] w-[300px] bg-gray-200" />
      </div>
    </div>
  </div>
</template>
