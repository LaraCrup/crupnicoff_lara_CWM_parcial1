<template>
    <div class="loader">
        <div class="sr-only">
            Cargando...
        </div>
    </div>
</template>

<style socped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 3px;
  background: 
    radial-gradient(farthest-side,#F26A8D 95%,#0000) 50% 0/12px 12px no-repeat,
    radial-gradient(farthest-side,#0000 calc(100% - 5px),#F26A8D calc(100% - 4px)) content-box;
  animation: l6 2s infinite ;
}
@keyframes l6 {to{transform: rotate(1turn)}}

</style>