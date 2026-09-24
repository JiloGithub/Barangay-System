import { useState } from 'react';
import Modal from './components/Modal';

function Example() {
  const [AddModel, setAddModel] = useState(false);

  return (
    <div className="p-8">
      <button
        onClick={() => setAddModel(true)}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
      >
        Open Modal
      </button>

      <Modal
        isOpen={AddModel}
        onClose={() => setAddModel(false)}
        title="Hello World"
      >
        <p>This is the modal body content.</p>
      </Modal>
    </div>
  );
}

export default Example;