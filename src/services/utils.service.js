import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'

export function formatDate(date, name='DD/MM/YYYY') {
	return format(new Date(date), name)
}

export function fromNowDate(date) {
	return formatDistance(new Date(date), new Date(), {addSuffix: true})
}

export function validateEmail(email){
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validatePhoneNumber(email){
  let re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
  return re.test(email);
}

export function ConvertHTML2TextNewLine(string){
	return string.replace(/<br\/>/g, '\n')
}

export function ConvertText2HTMLNewLine(string){
	return string.replace(/(\r\n|\n)/g, '<br/>')
}
