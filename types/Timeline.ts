// types/Timeline.ts
export interface TimelineEvent {
    title: string
    description: string
    date?: Date
    icon?: string
    color?: string
    metadata?: Record<string, any>
  }
  
  export interface TimelineOptions {
    direction?: 'vertical' | 'horizontal'
    theme?: 'light' | 'dark'
    animationStyle?: 'fade' | 'slide' | 'scale'
  }
  
  export type TimelineAnimationConfig = {
    duration: number
    easing: string
    delay?: number
  }