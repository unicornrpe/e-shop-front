import React from 'react';
import GetServices from '../services/get-services';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    try {
      const { CommonService } = GetServices();
      CommonService.postAppError('Error Boundry', { error, info });
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.warn(`Couldn't post error to LabFriend Server\n\n`, error);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
