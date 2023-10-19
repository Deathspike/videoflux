export interface Options {
  /**
   * Determines whether to force an re-encode.
   */
  force?: boolean;

  /**
   * Determines the encode quality.
   */
  quality: 'hq' | 'hqd' | 'mq' | 'mqd' | 'lq' | 'lqd';
}
