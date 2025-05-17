import type { Config } from "@react-router/dev/config";

export default {
  // Don't think I can make SSR work with the Service Worker Mock API
  ssr: false,
} satisfies Config;
