import React from 'react';
import Dropzone from 'react-dropzone';
import { Button, Icon } from 'semantic-ui-react';
const FileUpload = () => (
  <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
    {({ getRootProps, getInputProps }) => (
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Button icon style={{ margin: 'unset', borderRadius: 'unset' }}>
            <Icon name="attach" />
          </Button>
        </div>
      </section>
    )}
  </Dropzone>
);

export default FileUpload;
