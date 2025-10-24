import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form' // Integrates with React Hook Form

export default function RTE({ name, control, label, defaultValue = "" }) {
    // Get theme from document
    const isDarkMode = document.documentElement.classList.contains('dark');

    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1 dark:text-gray-300'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue} // Set default value here
                render={({ field: { onChange, value } }) => (
                    <Editor
                        // *** REPLACE WITH YOUR OWN TINYMCE API KEY ***
                        apiKey='dpoqaakkd0289wikgfziamxyhrut5ze3woi54d2ixgut8fh2'
                        value={value} // Use value from RHF
                        onEditorChange={onChange} // Update RHF on change
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar:
                                'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            skin: isDarkMode ? 'oxide-dark' : 'oxide',
                            content_css: isDarkMode ? 'dark' : 'default',
                        }}
                    />
                )}
            />
        </div>
    )
}