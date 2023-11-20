<template>
    <main>
      <ContentList path="/" v-slot="{ list }">
        <div v-for="article in list" :key="article._path">
          <a :href="article.slug">{{ article.title }}</a>
        </div>
      </ContentList>
    </main>
  </template>