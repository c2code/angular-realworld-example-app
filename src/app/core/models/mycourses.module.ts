
export interface Course {
    cid   : number;
    pid   : number;
    cname : string;
    cdes  : string;
    cvedio: string;
    clevel: string;
}

export interface Classroom{
	roomid    :number
	rname     :string
	rdesc     :string
	stdnum    :number
	rstatus   :string
	start     :string
	end       :string
	cid       :number
	tid       :number
	tname     :string
}

export interface HomeWork{
	hid      :number
	hstatus  :string
	haddr    :string
	uid      :number
	cid      :number
  rid      :number
	comment  :string
}

export interface Student{
	sid      :number
	uid      :number
	rid      :number
	uname    :string
	email    :string
	phone    :string
	rname    :string
}

export interface Teacher{
	tid       :number
	tstatus   :string
	uid       :number
	uname     :number
	email     :string
	phone     :string
}
