import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'IS373 RAG Research',
  description: 'Research and experiments in retrieval-augmented generation',
  base: '/is373-rag-prototype/',
  themeConfig: {
    nav: [
      { text: 'Overview', link: '/' },
      { text: 'Research', link: '/research' },
      { text: 'Experiment Plan', link: '/experiment' }
    ],
    sidebar: [
      { text: 'Overview', link: '/' },
      { text: 'Technical Research', link: '/research' },
      { text: 'Experiment Plan', link: '/experiment' }
    ]
  }
})
