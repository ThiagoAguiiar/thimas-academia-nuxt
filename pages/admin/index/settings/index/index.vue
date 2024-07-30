<template>
  <div
    class="py-5 border-b border-b-gray-200 gap-5 flex justify-between dark:border-b-gray-800 max-[881px]:flex-col max-[881px]:justify-start max-[881px]:items-start"
  >
    <div>
      <h4 class="font-semibold text-xl">Tema</h4>
      <p class="text-gray-500 text-[14px] dark:text-white">
        Personalize o tema do seu Dashboard.
      </p>
    </div>

    <AdminCustomColorMode />
  </div>

  <AdminSettingsProfileForm />
</template>
