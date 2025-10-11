import 'bootstrap/dist/css/bootstrap.min.css';
import './BlogTemplate.css';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function BlogTemplate() {
    const { slug } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        import(`../blogs/${slug}.md`)
            .then(res => {fetch(res.default)
            .then(res => res.text())
            .then(text => setContent(text))
            .catch(() => setContent(' 404 Not Found\nSorry, this blog does not exists.'), [slug]);
            })
    });
    return (
        <div>
            <ReactMarkDown>{content}</ReactMarkDown>
        </div>
    );
};


export default BlogTemplate;