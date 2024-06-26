<script setup lang="ts">
const auth = useAuth()
const events = ref<any[]>([])

onMounted(async () => {
  console.log('go')

  if (!auth.user.value) {
    return
  }

  const { tenant, clientId } = useRuntimeConfig().public

  const { data, error } = await useFetch(
    `https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=2024-05-23T21:02:17.067Z&enddatetime=2024-05-30T21:02:17.067Z`,
    {
      headers: {
        Authorization: `Bearer ${auth.user.value.accessToken}`,
      },
    },
  )

  if (error) {
    return
  }

  events.value = data.value as any[]
})
</script>

<template>
  <div>
    <h1>Meetings List</h1>

    {{ events }}

    <!-- <ul> -->
    <!--   <li -->
    <!--     v-for="event in events" -->
    <!--     :key="event.id" -->
    <!--   > -->
    <!--     <nuxt-link :to="`/meetings/${event.id}`"> -->
    <!--       {{ event.title }} -->
    <!--     </nuxt-link> -->
    <!--   </li> -->
    <!-- </ul> -->
  </div>
</template>
