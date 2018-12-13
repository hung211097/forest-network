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

export function validatePhoneNumber(number){
  let re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
  return re.test(number);
}

export function validateNumber(string){
	let re = /^\d+$/;
	return re.test(string);
}

export function ConvertHTML2TextNewLine(string){
	return string.replace(/<br\/>/g, '\n')
}

export function ConvertText2HTMLNewLine(string){
	return string.replace(/(\r\n|\n)/g, '<br/>')
}

export function timeStamp2Date(string){
	let ts = new Date(string)
	return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(ts)
}