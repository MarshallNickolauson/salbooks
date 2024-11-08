import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ExampleScreen = () => {
    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content) => {
        setEditorContent(content);
    };

    return (
        <>
            <style>
                {`
                    .formatted-content {
                        white-space: pre-wrap;
                        word-wrap: break-word;
                    }
                `}
            </style>

            <Container fluid className='mt-3'>
                <h1>Welcome to My Page</h1>
                <p>This container spans the entire width of the screen.</p>
                
                <ReactQuill
                    value={editorContent}
                    onChange={handleEditorChange}
                    theme='snow' // You can use 'bubble' or other themes as well
                />

                <div className='mt-4'>
                    <h4>Editor Content:</h4>
                    <div className="formatted-content" dangerouslySetInnerHTML={{ __html: editorContent }} />
                </div>

                <div className='mt-4'>
                    <h4>Active State:</h4>
                    <pre className="formatted-content">{editorContent}</pre>
                </div>
            </Container>
        </>
    );
};

export default ExampleScreen;
