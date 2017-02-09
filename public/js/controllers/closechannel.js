(function () {

	lnwebcli.controller("ModalCloseChannelCtrl", ["$uibModalInstance", "channel", "lncli", controller]);

	function controller ($uibModalInstance, channel, lncli) {

		var $ctrl = this;

		$ctrl.channel = channel;

		$ctrl.ok = function () {
			var channelPoint = $ctrl.channel.channel_point.split(":");
			var force = $ctrl.channel.forceclose;
			lncli.closeChannel(channelPoint[0], channelPoint[1], force).then(function(response) {
				console.log("CloseChannel", response);
				if (response.data.error) {
					$ctrl.warning = response.data.error;
				} else {
					$ctrl.warning = null;
					$uibModalInstance.close($ctrl.values);
				}
			}, function(err) {
				console.log('Error', err);
				bootbox.alert(err.message);
			});
		};

		$ctrl.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
		
		$ctrl.dismissAlert = function() {
			$ctrl.warning = null;
		}

	}

})();