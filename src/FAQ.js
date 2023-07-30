import React from 'react';
import { Collapse, Typography } from 'antd';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const FAQ = () => {
  return (
    <div className="faq-container">
      <Title level={4}>Frequently Asked Questions</Title>
      <Collapse bordered={false}>
        <Panel header="What is File Compressor?" key="1">
          <Text>
            File Compressor - EasyZip is a web application that allows you to compress files and folders to save storage space and reduce download times.
          </Text>
        </Panel>
        <Panel header="How do I use File Compressor?" key="2">
          <Text>
            To use File Compressor, simply drag and drop files and folders into the drop zone, or click to select them. Once you have selected your files, click on the "Compress Files" button to start the compression process.
          </Text>
        </Panel>
        <Panel header="What file formats does File Compressor support?" key="3">
          <Text>
            File Compressor supports various file formats, including PDFs, ZIP archives, and Excel spreadsheets. You can compress these files and more using the application.
          </Text>
        </Panel>
        <Panel header="Is the compression lossless?" key="4">
          <Text>
            Yes, File Compressor uses lossless compression techniques to reduce file sizes without sacrificing quality or data. Your files will be decompressed to their original state upon extraction.
          </Text>
        </Panel>
        {/* Add more FAQs here */}
      </Collapse>
    </div>
  );
};

export default FAQ;
