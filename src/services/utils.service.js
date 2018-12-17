import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import moment from 'moment'
import { constCalc } from '../constants/calculate'

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
	let timestamps = moment(string).unix()
	let ts = new Date(timestamps * 1000)
	return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(ts)
}

export function calcBandwithConsume(account, txString64, timeNewTransaction){
	const txSize = Buffer.from(txString64, 'base64').length
	const currentTime = timeNewTransaction
	let diff = constCalc.BANDWIDTH_PERIOD
	if(account.bandwithTime && account.sequence !== 1){
		if(moment(currentTime).unix() - moment(account.bandwithTime).unix() < constCalc.BANDWIDTH_PERIOD){
			diff = moment(currentTime).unix() - moment(account.bandwithTime).unix()
		}
	}
	const bandwidthConsume = Math.ceil(Math.max(0, (constCalc.BANDWIDTH_PERIOD - diff) / constCalc.BANDWIDTH_PERIOD) * account.bandwith + txSize)

	return bandwidthConsume
}
