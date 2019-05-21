import React from 'react';

export const myInput = props => {
  const {input, type, placeholder, meta}=props;

  return (
    <>
    <input {...props.input} type={props.type} placeholder={props.placeholder} />
    {
      meta.error && meta.touched &&
        <div>
        {meta.error}
        </div>
    }
    </>
  );
};