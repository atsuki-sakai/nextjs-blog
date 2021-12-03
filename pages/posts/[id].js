
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import utilsStyles from "../../styles/utils.module.css";
import Head from 'next/head';

export const getStaticPaths = async () => {

    const paths = getAllPostIds();
    return {
        paths:paths,
        fallback:false
    }
}
export const getStaticProps = async ({params}) => {
    const postData = await getPostData(params.id);
    return {
        props:{
            postData,
        }
    }
}

export default function Post({ postData }) {
  return (
    <Layout>
       <Head>
           <title>{ postData.title }</title>
       </Head>
       <article>
           <h1 className={utilsStyles.headingXL}>{ postData.title }</h1>
           <div className={ utilsStyles.lightText }>
               <Date dateString={ postData.date }></Date>
           </div>
           <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
       </article>
    </Layout> 
  );
}