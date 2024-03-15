export const processHashtags = (caption) => {
  const hashtags = caption.match(/#[\w|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/g) || [];

  return hashtags.map((hashtag) => ({
    where: { hashtag },
    create: { hashtag },
  }));
};
