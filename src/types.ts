export interface Options {
  /**
   * Determines whether to force re-encodes.
   */
  force?: boolean;

  /**
   * Determines the encode quality.
   */
  quality: 'hq' | 'hqd' | 'mq' | 'mqd' | 'lq' | 'lqd';

  /**
   * Determines whether logging is verbose.
   */
  verbose?: boolean;
}
