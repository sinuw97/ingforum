import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadsInput({ addThread }) {
  const [title, setTitle] = useInput('');
  const [category, setCategory] = useInput('');
  const [body, setBody] = useInput('');

  const onSubmitThread = (e) => {
    e.preventDefault();
    addThread({ title, category, body });
  };

  return (
    <form className="input-threads" onSubmit={onSubmitThread}>
      <input type="text" placeholder="Judul" value={title} onChange={setTitle} />
      <input type="text" placeholder="Kategori" value={category} onChange={setCategory} />
      <textarea type="text" placeholder="Mau ngobrol apa nih?" value={body} onChange={setBody}/>
      <button type="submit">Buat</button>
    </form>
  );
}

ThreadsInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadsInput;