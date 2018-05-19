
const checkFormat = {
	checkNickname (nickname) {
		
		let args = nickname;
		let t_n = null;
		let t_n_p = null;
		// 长度在3~12之间，仅含汉字、字母、数字和下划线！
		let reg = /^[\u4e00-\u9fa5a-zA-Z0-9_]{3,12}$/;
		
		if (args == null || args == undefined || args == '') {
			// 输入框为空
			t_n = '',
			t_n_p = '起个有个性的名字吧 ^_^'
		}
		else if (!reg.test(nickname)) {
			// 输入框不符合正则表达式
			t_n = '';
			t_n_p = '长度至少为3，且不含特殊符号！'
		} else {
			// 正常情况
			t_n = args;
			t_n_p = '起个有个性的名字吧 ^_^'
		}
		return {
			'nickname': t_n,
			'nicknamePlaceholder': t_n_p
		}
	}
}

export default checkFormat