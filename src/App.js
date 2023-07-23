import React, { useState, useEffect } from 'react';
import './App.css';
import { useDropzone } from 'react-dropzone';
import { Button, Typography, Table, Space, Card, List, Spin } from 'antd';
import { CloudUploadOutlined, FilePdfOutlined, FileExcelOutlined, FileZipOutlined, FileOutlined } from '@ant-design/icons';
import JSZip from 'jszip';
import pako from 'pako';

const { Title, Text } = Typography;

const formatFileSize = (bytes) => {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2) + ' MB';
};

const FileItem = ({ file, removeFile }) => {
  return (
    <List.Item>
      <div className="file-item">
        <div className="file-info">
          <Space>
            <span>
              {file.type === 'application/pdf' ? (
                <FilePdfOutlined style={{ marginRight: '8px' }} />
              ) : file.type === 'application/zip' ? (
                <FileZipOutlined style={{ marginRight: '8px' }} />
              ) : file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
                <FileExcelOutlined style={{ marginRight: '8px' }} />
              ) : (
                <FileOutlined style={{ marginRight: '8px' }} />
              )}
              {file.name}
            </span>
            <span>{formatFileSize(file.size)}</span>
          </Space>
        </div>
        <Button type="text" className="remove-button" onClick={() => removeFile(file.name)}>
          Remove
        </Button>
      </div>
    </List.Item>
  );
};

const App = () => {
  const [files, setFiles] = useState([]);
  const [isCompressed, setIsCompressed] = useState(false);
  const [totalSize, setTotalSize] = useState(0);
  const [estimatedCompressedSize, setEstimatedCompressedSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
    setIsCompressed(false); // Reset isCompressed when new files are selected
  };

  const compressFiles = () => {
    setLoading(true);
    const zip = new JSZip();
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '_');
    const compressedFileName = `compressed_files_${timestamp}.zip`;

    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const compressedContent = pako.deflate(reader.result);
          zip.file(file.name, compressedContent);
          resolve();
        };
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
      });
    });

    Promise.all(promises)
      .then(() => {
        zip.generateAsync({ type: 'blob' }).then((content) => {
          setIsCompressed(true);
          setEstimatedCompressedSize(content.size);
          downloadCompressedFile(content, compressedFileName);
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error compressing files:', error);
        // Handle any error if required
      });
  };

  const downloadCompressedFile = (content, fileName) => {
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const removeFile = (fileName) => {
    const updatedFiles = files.filter((file) => file.name !== fileName);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    directory: true,
  });

  useEffect(() => {
    const { totalSize, estimatedCompressedSize } = calculateSizes();
    setTotalSize(totalSize);
    setEstimatedCompressedSize(estimatedCompressedSize);
  }, [files]);

  const calculateSizes = () => {
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const estimatedCompressedSize = totalSize - calculateSavings().savingsInSize;
    return { totalSize, estimatedCompressedSize };
  };

  const calculateSavings = () => {
    const savingsInSize = totalSize - estimatedCompressedSize;
    const savingsInPercentage = ((savingsInSize / totalSize) * 100).toFixed(2);
    return { savingsInSize, savingsInPercentage };
  };

  const Savings = ({ title, value }) => {
    return (
      <Card className="savings-card" bordered={false}>
        <div>
          <Space>
            <Text strong>{title}</Text>
            <Text>{value}</Text>
          </Space>
        </div>
      </Card>
    );
  };

  const columns = [
    {
      title: 'File Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          {record.type === 'application/pdf' ? (
            <FilePdfOutlined style={{ marginRight: '8px' }} />
          ) : record.type === 'application/zip' ? (
            <FileZipOutlined style={{ marginRight: '8px' }} />
          ) : record.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
            <FileExcelOutlined style={{ marginRight: '8px' }} />
          ) : (
            <FileOutlined style={{ marginRight: '8px' }} />
          )}
          {text}
        </Space>
      ),
    },
    {
      title: 'File Size',
      dataIndex: 'size',
      key: 'size',
      render: (text) => formatFileSize(text),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Button type="text" className="remove-button" onClick={() => removeFile(record.name)}>
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div className="App">
      <div className="centered-container">
        <Title level={3}>File Compressor - EasyZip</Title>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <CloudUploadOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
          <p>Drag and drop files and folders here, or click to select</p>
        </div>
        {files.length > 0 && (
          <div className="selected-files">
            <h4>Selected Files:</h4>
            <Table
              dataSource={files}
              columns={columns}
              rowKey={(record) => record.name}
              pagination={false}
              expandable={{
                expandedRowRender: (record) => <FileItem file={record} removeFile={removeFile} />,
                rowExpandable: (record) => true,
              }}
            />
          </div>
        )}
        {isCompressed && (
          <div className="savings-container">
            <Savings title="Total Size of Files:" value={formatFileSize(totalSize)} />
            <Savings
              title="Estimated Savings:"
              value={`${formatFileSize(totalSize - estimatedCompressedSize)} (${calculateSavings().savingsInPercentage}%)`}
            />
          </div>
        )}
        <Button type="primary" onClick={compressFiles} disabled={files.length === 0}>
          Compress Files
        </Button>
        {loading && <Spin size="large" />}
      </div>
    </div>
  );
};

export default App;
