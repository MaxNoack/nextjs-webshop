import React, { useState, useEffect, useRef } from 'react';
import { getPages, getPage } from './api/queries';
import createApolloClient from './api/apolloClient';
import { getMenuProps } from '../lib/helpers';
import Layout from '../src/components/Layout/Layout';
import Image from 'next/image';
import { StructuredText } from 'react-datocms';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export const getStaticPaths = async () => {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query({ query: getPages });
  const paths = data?.allPages.map((page) => {
    return {
      params: { id: page.id, slug: page.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const apolloClient = createApolloClient();
  const { data } = await apolloClient.query({
    query: getPage,
    variables: {
      slug: context.params.slug,
    },
  });
  return {
    props: {
      pageData: data?.page,
      pages: await getMenuProps(),
    },
  };
};

const useStyles = makeStyles((theme) => ({
  headerStaticPage: {
    position: 'absolute',
    left: 0,
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
    color: 'black',
  },
  imageStaticPage: {
    opacity: '0.4',
  },
  bodyStaticPage: {
    margin: '30px 60px',
  },
}));

const StaticPage = ({ pageData, pages }) => {
  const classes = useStyles();
  const [height, setHeight] = useState(20);
  const ref = useRef(null)

  useEffect(() => {
    setHeight(ref.current?.clientHeight);
  }, [ref.current?.clientHeight])
  return (
    <Layout pages={pages}>
      <Typography
        className={classes.headerStaticPage}
        style={{top: height / 2 + 20}}
        component="h3"
        variant="h3"
      >
        {pageData.title}
      </Typography>
      <div className={classes.imageStaticPage} ref={ref}>
        <Image
          alt={''}
          src={pageData.mainImage.url}
          {...pageData.mainImage}
          height={500}
          objectFit={'cover'}
        />
      </div>
      <div className={classes.bodyStaticPage}>
      <Typography
        className={classes.bodyStaticPage}
        component="body2"
        variant="body2"
      >
        <StructuredText data={pageData.content} />
      </Typography>
      </div>
    </Layout>
  );
};

export default StaticPage;
