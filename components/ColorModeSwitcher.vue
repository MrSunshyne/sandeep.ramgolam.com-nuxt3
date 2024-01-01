<template>
  <div>
    <div class="flex gap-2">
      <ColorPickerIcon theme="light">
        <Icon name="solar:sun-fog-linear" />
      </ColorPickerIcon>
      <!-- <ColorPickerIcon theme="system">
        <Icon name="solar:laptop-outline"  />
      </ColorPickerIcon> -->
      <ColorPickerIcon theme="dark">
        <Icon name="solar:cloudy-moon-bold" />
      </ColorPickerIcon>
      <ColorPickerIcon theme="sepia">
        <Icon name="solar:umbrella-line-duotone" />
      </ColorPickerIcon>
    </div>
  </div>
</template>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
