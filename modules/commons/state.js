/**
 * Manager of states
 * =====================
 * Handler of emit
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 * 				  Ilua Chubarov [@agoalofalife] <agoalofalife@gmail.com>
 *
 * @license: MIT License
 *
 */
const EventEmitter = require("events").EventEmitter;
const STATE = {
	OK: 1,
	ERROR: 2,
	READY: 3,
	STOP: -1,
	START: null
};
const STATE_EVENTS = {
	CHANGE_STATUS: "change_status"
};

class Status extends EventEmitter {
	constructor() {
		super();
		this._status = STATE.START;
		this.register_handler();
	}

	/**
	* Register handle
	* =====================
	* Set emit() handle events in EE
	*
	*/
	register_handler() {
		this.on(STATE_EVENTS.CHANGE_STATUS, (status) => {
			this._status = status;
		});
	}

	/**
	* Get current status
	* =====================
	*
	* @return {boolean} status - current status of emit()
	*
	*/
	get_status() {
		return this._status;
	}

	/**
	* Check is 'READY' status
	* =====================
	* From STATE const
	*
	* @return {boolean} status - switch status
	*
	*/
	is_ready() {
		return this._status === STATE.READY;
	}

	/**
	* Check is 'NOT_READY' status
	* =====================
	* From STATE const
	*
	* @return {boolean} status - switch status
	*
	*/
	is_not_ready() {
		return this._status !== STATE.READY;
	}

	/**
	* Check is 'OK' status
	* =====================
	* From STATE const
	*
	* @return {boolean} status - switch status
	*
	*/
	is_ok() {
		return this._status === STATE.OK;
	}

	/**
	* Check is 'ERROR' status
	* =====================
	* From STATE const
	*
	* @return {boolean} status - switch status
	*
	*/
	is_error() {
		return this._status === STATE.ERROR;
	}

	/**
	* Check is 'STOP' status
	* =====================
	* From STATE const
	*
	* @return {boolean} status - switch status
	*
	*/
	is_stop() {
		return this._status === STATE.STOP;
	}

	/**
	* Check is 'START' status
	* =====================
	* From STATE const
	*
	* @return {boolean} status - switch status
	*
	*/
	is_start() {
		return this._status === STATE.START;
	}
}

module.exports = {
	STATE: STATE,
	STATE_EVENTS: STATE_EVENTS,
	Status: Status
};