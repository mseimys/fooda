import moment from "moment";

export function formatDate(value: string | undefined) {
  return moment(value).format("LLL");
}

export function formatAgo(value: string | undefined) {
  return moment(value).fromNow();
}
