const postMessageWeb = (type: string, data: string) => {
  window.parent!.postMessage(
    {
      from: 'styleLook',
      type,
      data,
    },
    '*',
  )
}

export default postMessageWeb
