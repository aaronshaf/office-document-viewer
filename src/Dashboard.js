import React from 'react';
import { FileDrop } from '@instructure/ui-file-drop';
import { Billboard } from '@instructure/ui-billboard';
import { IconDocumentLine } from '@instructure/ui-icons';
import { Flex } from '@instructure/ui-flex';
import { ScreenReaderContent } from '@instructure/ui-a11y-content';
import { TextInput } from '@instructure/ui-text-input';
import { Button } from '@instructure/ui-buttons';
import { Heading } from '@instructure/ui-heading';
import { View } from '@instructure/ui-view';

import './Document.css';

function Dashboard({ setDroppedFile }) {
  function onDropAccepted(files) {
    if (files) {
      setDroppedFile(files[0]);
    }
  }

  return (
    <div className={'Dashboard'}>
      <View as="div" margin="large">
        {/* <h1>Office Document Viewer</h1> */}

        <div className="Document">
          <FileDrop
            accept={['.docx']}
            onDropAccepted={onDropAccepted}
            onDropRejected={(file) => {
              console.error('file rejected');
            }}
            label={
              <Billboard
                heading={`Office Document Viewer`}
                message={`Drag and drop the file, or click to browse your computer.`}
                hero={<IconDocumentLine />}
              />
            }
          />

          <form method="get">
            <Flex justifyItems="center" margin="medium none none">
              <Flex.Item>
                <TextInput
                  // inputRef={(input) => (this.inputRef = input)}
                  label={<ScreenReaderContent>Document</ScreenReaderContent>}
                  name="file"
                  placeholder={`.docx URL (CORS enabled)`}
                  width="20rem"
                />
              </Flex.Item>
              <Flex.Item padding="0 0 0 x-small">
                <Button type="submit" variant="primary">
                  View
                </Button>
              </Flex.Item>
            </Flex>
          </form>
        </div>

        <div className="Document">
          <Heading level="h2">Example documents</Heading>
          <ul>
            <li>
              <a href="/?file=/test-documents/test1.docx">test1.docx</a>
            </li>
            <li>
              <a href="/?file=https://www.duxburysystems.com/documentation/dbt12.4/samples/word/english-en.docx">
                english-en.docx
              </a>
            </li>
            <li>
              <a href="/?file=https://filesamples.com/samples/document/docx/sample1.docx">
                sample1.docx
              </a>
            </li>
            <li>
              <a href="/?file=https://filesamples.com/samples/document/docx/sample2.docx">
                sample2.docx
              </a>
            </li>
            <li>
              <a href="/?file=https://filesamples.com/samples/document/docx/sample3.docx">
                sample3.docx
              </a>
            </li>
            <li>
              <a href="/?file=https://filesamples.com/samples/document/docx/sample4.docx">
                sample4.docx
              </a>
            </li>
            <li>
              <a href="/?file=https://www.coolfreecv.com/doc/resume_009.docx">
                resume_009.docx
              </a>
            </li>
            <li>
              <a href="/?file=https://file-examples.com/wp-content/uploads/2017/02/file-sample_1MB.docx">
                file-sample_1MB.docx
              </a>
            </li>
            {/* <li>
              <a href="/?file=https://www.coolfreecv.com/doc/resume_010.docx">
                resume_010.docx
              </a>
            </li> */}
          </ul>
        </div>

        <div className="Document">
          <Heading level="h2">Next up</Heading>
          <ul>
            <li>Fonts</li>
            <li>Tables</li>
            <li>Pagination</li>
            <li>Borders</li>
            <li>List item spacing</li>
          </ul>
        </div>

        <a
          href="https://github.com/aaronshaf/office-document-viewer"
          className="github-corner"
          aria-label="View source on GitHub"
        >
          <svg
            width={80}
            height={80}
            viewBox="0 0 250 250"
            style={{
              fill: '#151513',
              color: '#fff',
              position: 'absolute',
              top: 0,
              border: 0,
              right: 0,
            }}
            aria-hidden="true"
          >
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
            <path
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor"
              style={{ transformOrigin: '130px 106px' }}
              className="octo-arm"
            />
            <path
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor"
              className="octo-body"
            />
          </svg>
        </a>
      </View>
    </div>
  );
}

export default Dashboard;
