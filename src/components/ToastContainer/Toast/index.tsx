import React, { useEffect } from 'react';
import {
  FiCheckCircle, FiAlertCircle, FiXCircle, FiInfo,
} from 'react-icons/fi';
import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage,
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiXCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast:React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);

  return (
    <Container type={message.type} $hasdescription={!!message.description} style={style}>
      <FiAlertCircle size={20} />

      <div>
        <strong>
          {message.title}
        </strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type="button">
        {icons[message.type || 'info']}
      </button>
    </Container>
  );
};

export default Toast;
