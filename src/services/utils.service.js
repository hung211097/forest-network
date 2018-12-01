import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'

export function formatDate(date, name='DD/MM/YYYY') {
	return format(new Date(date), name)
}

export function fromNowDate(date) {
	return formatDistance(new Date(date), new Date(), {addSuffix: true})
}
