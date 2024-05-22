import { z } from 'zod'

const settingsSchema = z.object({
  cloudId: z.string(),
  email: z.string(),
  apiKey: z.string(),
})

export type Settings = z.infer<typeof settingsSchema>

export const useSettings = () => {
  const localStorageKey = 'settings'

  const data = useState<Settings>('settings', () => ({
    cloudId: '',
    email: '',
    apiKey: '',
  }))

  function save(newData: Settings): void {
    data.value = newData
    localStorage.setItem(localStorageKey, JSON.stringify(data.value))
  }

  function load(): void {
    const settingsFromStorage = localStorage.getItem(localStorageKey)

    if (!settingsFromStorage) {
      return
    }

    try {
      data.value = settingsSchema.parse(JSON.parse(settingsFromStorage))
    } catch {}
  }

  return { data, save, load }
}
