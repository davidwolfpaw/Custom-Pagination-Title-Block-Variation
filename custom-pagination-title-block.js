// This registers the block variation to display in the Full Site Editor
wp.blocks.registerBlockVariation(
    'core/query-pagination',
    {
        name: 'pagination-with-titles',
        title: 'Pagination with Titles',
        attributes: {
            className: 'pagination-with-titles',
        },
        icon: 'editor-table',
    }
);

//
wp.hooks.addFilter(
    'editor.BlockEdit',
    'cpt/pagination-with-titles-edit',
    function (BlockEdit) {
        return function (props) {
            // Skip modification in Full Site Editor since there's no specific post context
            const isSiteEditor = wp.data.select('core/edit-site') !== undefined;

            if (props.name !== 'core/query-pagination') {
                return wp.element.createElement(BlockEdit, props);
            }

            // If we are in the block editor, this message will display
            if (isSiteEditor) {
                return wp.element.createElement(
                    'div',
                    { className: 'pagination-with-titles-placeholder' },
                    'Pagination with Titles block will display previous and next post links with the current post title between them on the front end.'
                );
            }

            const postId = wp.data.select('core/editor').getCurrentPostId();
            const postTitle = wp.data.select('core/editor').getEditedPostAttribute('title');

            if (!postId || !postTitle) {
                return wp.element.createElement('div', { className: 'pagination-with-titles' }, 'Loading...');
            }

            // Fetch previous post
            const previousPosts = wp.data.select('core').getEntityRecords('postType', 'post', {
                exclude: [postId],
                per_page: 1,
                order: 'desc',
                orderby: 'date'
            });

            // Fetch next post
            const nextPosts = wp.data.select('core').getEntityRecords('postType', 'post', {
                exclude: [postId],
                per_page: 1,
                order: 'asc',
                orderby: 'date'
            });

            const previousPost = previousPosts && previousPosts.length ? previousPosts[0] : null;
            const nextPost = nextPosts && nextPosts.length ? nextPosts[0] : null;

            // Creates the previous post title and link, current post title, and next post title and link
            return wp.element.createElement(
                'div',
                { className: props.attributes.className || '' },
                previousPost && wp.element.createElement(
                    'a',
                    { href: previousPost.link, className: 'prev-post-link' },
                    'Previous'
                ),
                wp.element.createElement(
                    'span',
                    { className: 'current-post-title' },
                    postTitle
                ),
                nextPost && wp.element.createElement(
                    'a',
                    { href: nextPost.link, className: 'next-post-link' },
                    'Next'
                )
            );
        };
    }
);
