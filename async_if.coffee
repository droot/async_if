async_if = (fn, args, timeout)->
	dfd = new jQuery.Deferred()
	curr_probe = null

	probe = ()->
		if fn(args)
			dfd.resolve(args)
			curr_probe = null
		else
			curr_probe = setTimeout probe, 5
	
	if timeout
		setTimeout(()->
					curr_probe and clearTimeout curr_probe
					dfd.reject(args)
			,timeout)

	probe()
	return dfd.promise()

root = exports ? this
root.async_if = async_if
