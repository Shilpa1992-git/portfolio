import rss from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'DevOps Engineering Blog | Shilpa Salunkhe',
    description: 'Welcome to my DevOps blog, where I share my learning journey about Docker, Kubernetes, Jenkins, CI/CD, and modern DevOps tools.',
    site: context.site,
    items: [],
    customData: `<language>en</language>`,
  });
}
