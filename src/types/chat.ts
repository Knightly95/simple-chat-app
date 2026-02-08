export interface Message {
  _id: string;
  message: string;
  author: string;
  createdAt: Date | string;
}

export interface CreateMessageRequest {
  message: string;
  author: string;
}

export interface ErrorResponse {
  error: string;
  details?: string | Record<string, unknown>;
}

export interface InternalServerError {
  error: {
    message?: string;
    code?: string;
    [key: string]: unknown;
  };
}
