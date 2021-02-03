export const cqEditConfigTemplate: string = `<?xml version="1.0" encoding="UTF-8"?>
<jcr:root 
	xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0"
	jcr:primaryType="cq:EditConfig"
	cq:actions="[edit]">
	<cq:listeners
		jcr:primaryType="cq:EditListenersConfig"
		afteredit="REFRESH_PAGE"/>
</jcr:root>
`