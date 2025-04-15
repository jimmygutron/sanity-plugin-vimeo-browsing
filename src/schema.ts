export const vimeoVideoSchema = {
  name: 'vimeo.video',
  type: 'object',
  title: 'Vimeo Video',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Files',
      name: 'files',
      type: 'array',
      of: [
        {
          title: 'Video File',
          name: 'video_file',
          type: 'object',
          fields: [
            {
              title: 'Resolution',
              name: 'resolution',
              type: 'string',
            },
            {
              title: 'File Url',
              name: 'fileUrl',
              type: 'url',
            },
            {
              title: 'Video Width',
              name: 'videoWidth',
              type: 'number',
            },
            {
              title: 'Video Height',
              name: 'videoHeight',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      title: 'Thumbnail',
      name: 'thumbnail',
      type: 'url',
    },
    {
      title: 'Width',
      name: 'width',
      type: 'number',
    },
    {
      title: 'Height',
      name: 'height',
      type: 'number',
    },
    {title: 'Manage Link', name: 'manageLink', type: 'url'},
  ],
}
