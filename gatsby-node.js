const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// Setup Import Alias
exports.onCreateWebpackConfig = ({ getConfig, actions, stage }) => {
  const output = getConfig().output || {};

  const config = {
    output,
    resolve: {
      alias: {
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/contexts': path.resolve(__dirname, 'src/contexts'),
        '@/constants': path.resolve(__dirname, 'src/constants'),
        '@/domains': path.resolve(__dirname, 'src/domains'),
        '@/hooks': path.resolve(__dirname, 'src/hooks'),
        '@/styles': path.resolve(__dirname, 'src/styles'),
        '@/typings': path.resolve(__dirname, 'src/typings'),
        '@/utils': path.resolve(__dirname, 'src/utils'),
        components: path.resolve(__dirname, 'src/components'),
        styles: path.resolve(__dirname, 'src/styles'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
      },
    },
  };

  // SSR 단계에서 react-icons ESM 호환성 문제 방지 (CJS 우선)
  if (stage === 'build-html' || stage === 'develop-html') {
    config.resolve.conditionNames = ['require', 'node', 'default'];
  }

  actions.setWebpackConfig(config);
};

// frontmatter의 thumbnail(String)을 File 노드로 연결
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemarkFrontmatter {
      thumbnail: File @fileByRelativePath
    }
  `);
};

// Generate Post Page Through Markdown Data
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  // Get All Markdown File For Paging
  const queryAllMarkdownData = await graphql(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
      ) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // Handling GraphQL Query Error
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`);
    return;
  }

  // Import Post Template Component
  const PostTemplateComponent = path.resolve(
    __dirname,
    'src/templates/post_template.tsx',
  );

  // Page Generating Function
  const generatePostPage = ({
    node: {
      fields: { slug },
    },
  }) => {
    const pageOptions = {
      path: slug,
      component: PostTemplateComponent,
      context: { slug },
    };

    createPage(pageOptions);
  };

  // Generate Post Page And Passing Slug Props for Query
  queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage);
};

// slug 필드 생성 (fields.slug)
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode });
    createNodeField({ node, name: 'slug', value: slug });
  }
};
