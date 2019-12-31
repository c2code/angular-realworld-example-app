
export interface Course {
    cid   : number;
    pid   : number;
    cname : string;
    cdes  : string;
    cvedio: string;
    clevel: string;
    depth : number;
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
  hdesc    :string
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
  level    :string
  ccid     :number
}

export interface Teacher{
	tid       :number
	tstatus   :string
	uid       :number
	uname     :string
	email     :string
	phone     :string
  rcount    :number
}
