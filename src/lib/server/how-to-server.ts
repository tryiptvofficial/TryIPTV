
import { howToArticles as articles } from '@/lib/how-to';
import { generateEmbedding } from '../vector-seo';
import { unstable_cache as cache } from 'next/cache';

// Augment the article type to include an optional embedding
export type ArticleWithEmbedding = (typeof articles)[0] & {
    embedding: number[];
};

// Function to generate embeddings for all articles, intended for server-side use
export const getArticlesWithEmbeddings = cache(async (): Promise<ArticleWithEmbedding[]> => {
    if (!articles.length) {
        return [];
    }
    const articlesWithEmbeddings = await Promise.all(
        articles.map(async (article) => {
            // Create a single text block for embedding
            const contentToEmbed = [
                article.title,
                article.description,
                ...article.steps.map(step => `${step.title}: ${step.description}`),
                ...(article.faqs ? article.faqs.map(faq => `${faq.question} ${faq.answer}`) : [])
            ].join('\n\n');

            const embedding = await generateEmbedding(contentToEmbed);
            return {
                ...article,
                embedding,
            };
        })
    );
    return articlesWithEmbeddings;
},
['articles-with-embeddings-v3'],
{ revalidate: 3600, tags: ['articles'] }
);
