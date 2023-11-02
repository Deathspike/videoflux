export type Metadata = {
  streams: Array<MetadataStream>;
};

export type MetadataStream = {
  codec_name: string;
  codec_type: string;
  index: number;
  tags?: Record<string, string>;
};

export type Options = {
  force?: boolean;
  quality: 'hq' | 'hqd' | 'mq' | 'mqd' | 'lq' | 'lqd';
  verbose?: boolean;
};
