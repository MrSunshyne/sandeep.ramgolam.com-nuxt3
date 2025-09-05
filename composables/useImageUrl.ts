export const useImageUrl = () => {
  const config = useRuntimeConfig()
  
  /**
   * Convert image URLs for GitHub Pages optimization
   * @param path - The local image path (e.g., '/content/images/2023/example.jpg')
   * @returns The optimized URL for the current environment
   */
  const getImageUrl = (path: string): string => {
    // If not on GitHub Pages or no GitHub config, return original path
    if (!config.public.isGithubPages || !config.public.githubRawBaseUrl) {
      return path
    }
    
    // If path starts with /content/images/, rewrite to GitHub raw URL
    if (path.startsWith('/content/images/')) {
      return `${config.public.githubRawBaseUrl}${path}`
    }
    
    // For other paths, return as-is
    return path
  }
  
  /**
   * Check if we're running on GitHub Pages
   */
  const isGitHubPages = (): boolean => {
    return !!config.public.isGithubPages
  }
  
  /**
   * Get the base URL for GitHub raw content
   */
  const getGitHubRawBaseUrl = (): string => {
    return config.public.githubRawBaseUrl || ''
  }
  
  return {
    getImageUrl,
    isGitHubPages,
    getGitHubRawBaseUrl
  }
}
