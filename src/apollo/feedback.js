import { gql } from "@apollo/client";

export const SEND_FEEDBACK_TO_API = gql`
mutation CreateFeedback ($input: FeedbackInput!) {
  createFeedback (input: $input) {
    ... on Feedback {
      name
      comment
      contacts
    }
  }
}
`;