import type { NextPage } from "next";
interface Iprops {
  articleId: Number;
}

const Article: NextPage<Iprops> = ({ articleId }) => {
  return (
    <div>
      <h1>文章{articleId}</h1>
    </div>
  );
};

Article.getInitialProps = (context) => {
  const { articleId } = context.query;
  return {
    articleId: Number(articleId),
  };
};

export default Article;
