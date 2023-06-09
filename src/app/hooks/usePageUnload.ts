import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

interface Args {
  onUnload?: () => void
  enabled?: boolean
}

/**
 * Provides a custom hook to display a confirmation dialog when leaving a page with unsaved changes.
 * @param {Object} args - The arguments object.
 * @param {Function} args.onUnload - Optional. A callback function to be called when the page is unloaded.
 * @param {boolean} args.hasUnsavedChanges - Optional. Indicates whether the page has unsaved changes. Default is false.
 */
export const usePageUnload = (
  { onUnload, enabled }: Args = { enabled: true }
) => {

  const router = useRouter()

  /**
   * Callback function to be executed when the 'beforeunload' event is triggered.
   * @param {BeforeUnloadEvent} event - The beforeunload event object.
   */
  const unloadCallback = (event: BeforeUnloadEvent) => {
    if (!enabled) return
    event.returnValue = '' // Display a confirmation dialog before leaving the page
    event.preventDefault() // Prevent the default behavior of closing or reloading the page
    return '' // Legacy event.returnValue syntax for older browsers
  }

  /**
   * Callback function to be executed when the 'routeChangeStart' event is triggered.
   */
  const routeChangeStartCallback = () => {
    if (!enabled) return
    if (!window.confirm("Are you sure you want to leave this session?")) {
    //   // Cancel the route change
    //   router.events.emit('routeChangeError')
    //   throw 'routeChange aborted.'
    }
  }

  useEffect(() => {
    // Add event listener for 'routeChangeStart' event
    // router.events.on('routeChangeStart', routeChangeStartCallback)

    // Add event listener for 'beforeunload' event
    window.addEventListener('beforeunload', unloadCallback)

    if (onUnload) {
      // Add event listener for 'unload' event if onUnload callback is provided
      window.addEventListener('unload', onUnload)
    }

    // Clean up by removing event listeners
    return () => {
      window.removeEventListener('beforeunload', unloadCallback)
    //   router.events.off('routeChangeStart', routeChangeStartCallback)

      if (onUnload) {
        window.removeEventListener('unload', onUnload)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, onUnload, router])
}